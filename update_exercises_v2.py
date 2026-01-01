
import json
import os

# Define image mapping based on what we've generated
# ID to (filename, alt_text, type)
image_map = {
    1: ("number_zero_empty_basket_1767235615623.png", "Một cái giỏ rỗng (số 0)", "illustration"),
    2: ("number_one_sun_1767235630692.png", "Một mặt trời vàng (số 1)", "illustration"),
    3: ("number_two_butterflies_1767235648191.png", "Hai con bướm xinh đẹp (số 2)", "illustration"),
    4: ("number_three_apples_v2_1767236451554.png", "Ba quả táo đỏ (số 3)", "illustration"),
    5: ("number_four_flowers_1767236394577.png", "Bốn bông hoa rực rỡ (số 4)", "illustration"),
    6: ("number_five_stars_1767236467298.png", "Năm ngôi sao vàng (số 5)", "illustration"),
    7: ("number_six_balloons_1767236483652.png", "Sáu quả bóng bay (số 6)", "illustration"),
    
    # Counting
    12: ("counting_apples_3_1767235661359.png", "Ba quả táo đỏ để đếm", "photo"),
    14: ("counting_apples_3_1767235661359.png", "Ba quả táo đỏ để đếm", "photo"), # Reusing image where appropriate
    16: ("counting_apples_5_1767235676797.png", "Năm quả táo đỏ để đếm", "photo"),
    17: ("counting_stars_6_1767235700727.png", "Sáu ngôi sao lấp lánh", "illustration"),
    19: ("counting_flowers_8_1767235713890.png", "Tám bông hoa trong vườn", "illustration"),
    21: ("counting_balloons_10_1767236346762.png", "Mười quả bóng bay trên trời", "illustration"),
    
    # Sequences & Ordering
    38: ("number_line_0_to_10_1767236376392.png", "Trục số từ 0 đến 10", "diagram"),
    39: ("number_line_0_to_10_1767236376392.png", "Trục số từ 0 đến 10", "diagram"),
    40: ("number_line_0_to_10_1767236376392.png", "Trục số từ 0 đến 10", "diagram"),
    
    41: ("number_sequence_train_1767236362234.png", "Đoàn tàu chở các con số", "illustration"),
    42: ("number_sequence_train_1767236362234.png", "Đoàn tàu chở các con số", "illustration")
}

def update_json():
    input_path = "data/exercises-module1.json"
    output_path = "data/exercises-module1.json" # Overwrite directly
    
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            exercises = json.load(f)
            
        updated_count = 0
        
        for exercise in exercises:
            ex_id = exercise.get('id')
            if ex_id in image_map:
                filename, alt, img_type = image_map[ex_id]
                # Fix relative path - remove unique ID suffix if needed or keep exact
                # Currently files are copied exactly as generated
                exercise['imageUrl'] = f"/images/exercises/module1/{filename}"
                exercise['imageAlt'] = alt
                exercise['imageType'] = img_type
                updated_count += 1
                
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(exercises, f, ensure_ascii=False, indent=4)
            
        print(f"Successfully updated {updated_count} exercises in {output_path}")
        
    except Exception as e:
        print(f"Error updating JSON: {e}")

if __name__ == "__main__":
    update_json()
