from table import new_table
from player import Player, juant
from app import app
from flask import jsonify, request
import shared_state as shared_state
from scraper import update_item_details, item_details

@app.route("/")
def index():
    return 'Hello World'

@app.route('/get-drop')
def recieve_drop():
    try:
        drop = new_table.get_drop(juant)
        return jsonify({'Inventory': drop}), 200
    except Exception as e:
        return jsonify({'error', str(e)}), 500


@app.route('/get-drop/drop-current', methods=['GET', 'DELETE'])
def drop_item():
    remove_previous = juant.drop_item()
    return jsonify(remove_previous), 200

@app.route('/clear-inventory', methods=['GET', 'POST'])
def clear_inv():
    clear_inv = juant.clear_inventory()
    return jsonify(clear_inv)

@app.route('/get-boss', methods=['POST'])
def get_boss():
    data = request.get_json()
    new_boss_name = data.get('boss').lower()
    print(new_boss_name)
    if new_boss_name:
        shared_state.boss_name = new_boss_name
        try:
            # Fetch and update item details for the new boss
            update_item_details()       
            new_table.update_table(item_details)
            drop = new_table.get_drop(juant)
            return jsonify({"Inventory": drop}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    return jsonify({"error": "No boss name provided"}), 400