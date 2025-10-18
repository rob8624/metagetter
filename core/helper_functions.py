from datetime import datetime

def create_message(obj, content):
    header = f"""Image Metadata Report:
            COPYRIGHT METAGETTER
            file: {obj.upload_name}
            time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    return header + content