import warnings
warnings.filterwarnings("ignore")

import logging

import os
import config
from dotenv import load_dotenv, find_dotenv
from flask import Flask
from flask_cors import CORS

logs_dir = os.getcwd() + '/logs/'
if not os.path.exists(logs_dir):
    os.makedirs(logs_dir)

logging.basicConfig(format='%(asctime)s | %(levelname)s : %(message)s',
                    level=logging.INFO,
                    filename=os.path.join(logs_dir, 'info.log'),
                    filemode="w"
                    )
logger = logging.getLogger("init")
logger.setLevel(logging.INFO)

ch = logging.StreamHandler()
ch.setLevel(logging.INFO)
# create formatter
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
# add formatter to ch
ch.setFormatter(formatter)
# add ch to logger
logger.addHandler(ch)

load_dotenv(find_dotenv())
app = Flask(__name__)
CORS(app)
config = config.ProductionConfig() if os.environ.get('FLASK_ENV') == 'production' else config.DevelopmentConfig()
app.secret_key = "secret"
app.config.from_object(config)
print(app.config['MU'])


from app import views


if __name__ == "__main__":
    app.run()