import logging
import os
from transformers import GPT2LMHeadModel, GPT2Tokenizer, AutoConfig


logging.basicConfig(format='%(asctime)s | %(levelname)s : %(message)s',
                    level=logging.INFO,

                    )
logger = logging.getLogger("download")
logger.setLevel(logging.INFO)

ch = logging.StreamHandler()
ch.setLevel(logging.INFO)
# create formatter
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
# add formatter to ch
ch.setFormatter(formatter)
# add ch to logger
logger.addHandler(ch)


model_name = 'alienspaceman/rus_dreamgen_fulltext_medium'

subdir = os.path.join('models', 'gpt2')
if not os.path.exists(subdir):
    os.makedirs(subdir)
subdir = subdir.replace('\\','/')
logger.info(f"Created {subdir}")


GPT2LMHeadModel.from_pretrained(model_name).save_pretrained(subdir)
GPT2Tokenizer.from_pretrained(model_name).save_pretrained(subdir)
