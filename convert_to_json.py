import re
import json

# Input and output file paths
input_file = "NpcID.java"
output_file = "NpcID.json"

# Initialize a dictionary to hold the parsed NPC data
npc_data = {}
def convertStr(str):
	if any(char.isdigit() for char in str):
		pass
	else:
		new_str = str.lower().replace('_', ' ')
		res = [str.capitalize() for str in new_str.split()]

		return ' '.join(res)

# Read and parse the file
with open(input_file, "r") as file:
    for line in file:
        # Match lines that declare constants
        match = re.match(r'\s*public static final int (\w+)\s*=\s*(\d+);', line)
        if match:
            name, npc_id = match.groups()
            npc_data[convertStr(name)] = int(npc_id)

# Write the JSON data to a file
with open(output_file, "w") as file:
    json.dump(npc_data, file, indent=4)

print(f"JSON file '{output_file}' created successfully!")
