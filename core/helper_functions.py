from datetime import datetime
import json

def format_metadata_human_readable(metadata: dict) -> str:
    lines = []
    for section, section_data in metadata.items():
        lines.append(f"\n=== {section} Metadata ===\n")
        if not isinstance(section_data, dict):
            lines.append(f"  [Unsupported format in section: {section}]\n")
            continue
        for key, value in section_data.items():
            # Convert complex types to string
            if isinstance(value, (list, tuple)):
                value = ", ".join(map(str, value))
            elif not isinstance(value, str):
                value = str(value)
            # Format key-value pair
            lines.append(f"{key:<30}: {value}")
    return "\n".join(lines)


def create_message(obj: object, content: str):
    header = f"""Image Metadata Report:
            COPYRIGHT METAGETTER
            file: {obj.upload_name}
            time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    return header + content


def handle_task(sorted_metadata: dict, task: str) -> str: 
    
    task = task.strip().upper()
    tasks = {
        'JSON' : json.dumps(sorted_metadata, indent=4),
        'TEXTFILE' : format_metadata_human_readable(sorted_metadata)
    }  
    
    return tasks[task]

    