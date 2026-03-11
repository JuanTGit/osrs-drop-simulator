import requests
from bs4 import BeautifulSoup
import shared_state as shared_state

item_details = {}

def update_item_details():
	global item_details  # Ensure you're modifying the global dictionary

	# Clear previous item details
	item_details.clear()

	# Dynamically fetch the boss wiki page based on the updated boss name
	headers = {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
	}
	boss_url = f"https://oldschool.runescape.wiki/w/{shared_state.boss_name}"
	response = requests.get(boss_url, headers=headers)

	soup = BeautifulSoup(response.text, "html.parser")
	
	# Parse the page and populate item_details
	boss_tables = soup.find_all('table', attrs={'class': 'item-drops'})
	boss_table = soup.find('table', attrs={'class': 'infobox-monster'})

	boss_image = boss_table.find('img')['src']
	
	item_details['boss_image'] = f'https://oldschool.runescape.wiki{boss_image}'
	
	for table in boss_tables:
		table_name = table.find_previous('h3').text
		print(table_name)
		
		rows = table.find_all('tr')
		# print(rows)
		
		for row in rows[1:]:
			item_name_cell = row.find('td', attrs={'class': 'item-col'})
			item_quantity_cell = row.find('td', attrs={'data-sort-value': True})
			item_rarity_cell = row.find('span', attrs={'data-drop-fraction': True})
			item_value_cell = row.find('td', attrs={'class': 'ge-column'})
			item_img_cell = row.find('td', attrs={'class': 'inventory-image'})

			image_url = None
			if item_img_cell:
				img_tag = item_img_cell.find('img', attrs={'src': True})
				if img_tag:
					image_url = img_tag['src']

			img_src = f'https://oldschool.runescape.wiki{image_url}'

			if item_name_cell and item_quantity_cell and item_rarity_cell and item_value_cell:
				item_name = item_name_cell.text.strip()
				item_quantity = item_quantity_cell['data-sort-value']
				item_rarity = item_rarity_cell['data-drop-fraction'].replace(',', '')
				item_rarity_fraction = item_rarity_cell['data-drop-oneover']
				item_value = item_value_cell['data-sort-value']

				def convert_drops(string):
					string = string.replace('~', '')
					if '/' in string:
						numerator, denominator = map(float, string.split('/'))
						return numerator / denominator

				if table_name not in item_details:
					item_details[table_name] = []

				item_details[table_name].append({
					"name": item_name,
					"quantity": item_quantity,
					"rarity": [convert_drops(item_rarity), item_rarity_fraction],
					"value": item_value,
					"image": img_src
				})
try:
    update_item_details()
except Exception as e:
    print(str(e))