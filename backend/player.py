
class Player:

    def __init__(self, name):
        self.name = name
        self.raid_counter = 0
        self.inventory = {}
        self.last_item = []

    def add_item(self, items):
        self.raid_counter += 1
        self.last_item = [items['name'], int(items['quantity']), int(items['value'])]

        drop = items['name']
        if drop in self.inventory:
            self.inventory[drop]['quantity'] += int(items['quantity'])
            self.inventory[drop]['value'] += int(items['value'])
        else:
            self.inventory[drop] = {
                'quantity': int(items['quantity']),
                'value': int(items['value']),
                'rarity': [items['rarity'][0], items['rarity'][1]],
                'image': items['image']
            }

    def calculate_inventory(self):
        total = 0
        if self.inventory:
            for value in self.inventory.values():
                total += value['value']
        return total
    
    def drop_item(self):
        print('hello')
        if self.last_item[0] in self.inventory:
            inv_last_item = self.inventory[self.last_item[0]]
            if self.last_item[1] < inv_last_item['quantity']:
                inv_last_item['quantity'] -= self.last_item[1]
                inv_last_item['value'] -= self.last_item[2]
                
            elif inv_last_item['quantity'] <= self.last_item[1]:
                del self.inventory[self.last_item[0]]
            return {'Inventory': self.inventory, 'total': self.calculate_inventory()}
        else:
            return {'Inventory': self.inventory, 'empty': True}
        
    def drop_items(self, item):
        if item in self.inventory:
            del self.inventory[item]
        else:
            return 'Item not in inventory'
        
    def clear_inventory(self):
        self.inventory = {}
        self.last_item = []
        self.raid_counter = 0
        return {'Inventory': self.inventory, 'total': self.calculate_inventory()}

juant = Player('Juan T')
sherleyl = Player('Sherley L')