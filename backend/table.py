import random
from player import Player, juant
from scraper import item_details

class DropTable:

    def __init__(self, table):
        self.table = table
        self.probability_table = {}
        self.boss_image = None
        self.update_table(table)
    
    def update_table(self, new_table):
        # Update table with new data
        self.table = new_table
        self.probability_table = {}
        self.boss_image = None

        # Recalculate the probability table with the new items
        for table, items in self.table.items():
            cumulative_drop_rate = 0
            if table == 'boss_image':
                self.boss_image = items
            else:
                for item in items:
                    cumulative_drop_rate += item['rarity'][0]
                self.probability_table[table] = cumulative_drop_rate

    
    def get_drop(self, player):
        table_roll = random.random()
        cumulative_table_prob = 0

        selected_table = None
        for table, chance in self.probability_table.items():
            cumulative_table_prob += chance
            if table_roll <= cumulative_table_prob:
                selected_table = table
                print(f"{selected_table} Hit!")
                break
        
        if selected_table is None:
            selected_table = "Other"

        items = self.table[selected_table]

        def item_received():
            cumulative_rarity = 0
            item_roll = random.random()
            for item in items:
                cumulative_rarity += item['rarity'][0]
                if item_roll <= cumulative_rarity:
                    item_copy = item.copy()
                    return item_copy
            
            random_table_item = random.choice(items).copy()

            return random_table_item
        
        item_drop = item_received()
        player.add_item(item_drop)
        total_profit = juant.calculate_inventory()


        return [total_profit, juant.inventory, item_drop, juant.raid_counter, self.boss_image]
            

new_table = DropTable(item_details)