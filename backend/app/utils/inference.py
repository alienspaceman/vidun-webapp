import logging
import re
import os
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel
torch.set_grad_enabled(False)

logger = logging.getLogger('inference')
logger.setLevel(logging.INFO)

ch = logging.StreamHandler()
ch.setLevel(logging.INFO)
# create formatter
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
# add formatter to ch
ch.setFormatter(formatter)
# add ch to logger
logger.addHandler(ch)

# device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
device = 'cpu'
tokenizer = GPT2Tokenizer.from_pretrained('../models/gpt2')
model = GPT2LMHeadModel.from_pretrained('../models/gpt2').eval()
model = model.to(device)
logger.info('Model is downloaded')


def extend(text, size=150):
    prepared_text = '<s>'
    prepared_text += text
    logger.info('Encode text')
    input_tokens = tokenizer.encode(prepared_text, return_tensors="pt")
    logger.info('Ask model')
    out = model.generate(input_tokens.to(device),
                         max_length=size,
                         repetition_penalty=3.0,
                         do_sample=True,
                         top_k=20,
                         top_p=0.9,
                         temperature=0.7,
                         pad_token_id=50257,
                         )
    logger.info('Got result')
    text_ext = tokenizer.decode(out[0], skip_special_tokens=True)
    logger.info(text_ext)
    text_ext = re.sub('^<s>', '', text_ext)
    text_ext = re.sub('<.*$', '', text_ext)
    # text_ext = text_ext.strip('.,/-():;"!? ') + '.'
    logger.info(text_ext)
    return text_ext