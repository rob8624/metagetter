import logging

class SafeFormatter(logging.Formatter):
    """
    Formatter that ensures 'user_id' and 'ip' exist on every record.
    """
    def format(self, record):
        if not hasattr(record, "user_id"):
            record.user_id = "-"
        if not hasattr(record, "ip"):
            record.ip = "-"
        return super().format(record)