import json
import os

def generate_number_options(correct_answer, is_double_digit=False):
    """Generate 4 multiple choice options for number answers"""
    try:
        answer = int(correct_answer) if correct_answer.isdigit() else int(correct_answer)
    except:
        # For non-numeric answers, return as-is
        return [correct_answer]
    
    options = [str(answer)]
    
    # Generate 3 distractors
    candidates = set()
    
    # Add nearby numbers
    if answer > 0:
        candidates.add(answer - 1)
    if answer > 1:
        candidates.add(answer - 2)
    candidates.add(answer + 1)
    candidates.add(answer + 2)
    
    # For numbers 0-10, ensure they're in range
    candidates = {c for c in candidates if 0 <= c <= 11}
    candidates.discard(answer)  # Remove correct answer
    
    # Pick 3 distractors
    distractors = sorted(list(candidates))[:3]
    
    # If we don't have enough, add more
    while len(distractors) < 3:
        next_num = max(distractors + [answer]) + 1
        if next_num <= 11:
            distractors.append(next_num)
        else:
            prev_num = min(distractors + [answer]) - 1
            if prev_num >= 0:
                distractors.insert(0, prev_num)
            else:
                break
    
    options.extend([str(d) for d in distractors[:3]])
    
    return sorted(list(set(options)), key=lambda x: int(x))[:4]

def add_options_to_exercises(file_path):
    """Add options to all exercises without them"""
    print(f"Processing {file_path}...")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        exercises = json.load(f)
    
    modified_count = 0
    
    for exercise in exercises:
        # Skip if already has options
        if 'options' in exercise:
            continue
        
        # Add options based on correct answer
        correct_answer = exercise['correctAnswer']
        options = generate_number_options(correct_answer)
        
        exercise['options'] = options
        exercise['type'] = 'multiple-choice'  # Update type
        modified_count += 1
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(exercises, f, ensure_ascii=False, indent=4)
    
    print(f"✅ Modified {modified_count} exercises in {os.path.basename(file_path)}")
    return modified_count

def main():
    data_dir = r'c:\Users\acer\.gemini\antigravity\scratch\New folder\learn math app\data'
    
    total_modified = 0
    for i in range(1, 5):
        file_path = os.path.join(data_dir, f'exercises-module{i}.json')
        if os.path.exists(file_path):
            count = add_options_to_exercises(file_path)
            total_modified += count
    
    print(f"\n🎉 Total: {total_modified} exercises converted to multiple choice!")

if __name__ == "__main__":
    main()
