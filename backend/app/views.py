import logging
import json
from app import app
from flask import request, send_file
from app.utils.inference import extend

logger = logging.getLogger('views')
logger.setLevel(logging.INFO)

ch = logging.StreamHandler()
ch.setLevel(logging.INFO)
# create formatter
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
# add formatter to ch
ch.setFormatter(formatter)
# add ch to logger
logger.addHandler(ch)

@app.route('/healthcheck')
def healthcheck():
    logger.info('visited main page')
    return "Hello, World!"

@app.route('/inference', methods=['POST'])
def make_inference():
    logger.info('visited inference page')
    data = request.form.to_dict(flat=True)
    logger.info(f'Input raw data {data}')
    try:
        statusCode = 200
        status = 'OK'
        response_data = extend(data['description'])
        logger.info(response_data)
    except Exception as e:
        statusCode = 400
        status = 'Fail'
        response_data = {f'{e}'}

    response = json.dumps({
        "statusCode": statusCode,
        "status": status,
        "result": response_data
    })
    return response
