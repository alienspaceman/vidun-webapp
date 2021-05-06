#FROM python:3.6-slim
#EXPOSE 5555
#
##ENV FLASK_DEBUG=1
#
#WORKDIR /usr/src/app
#
#RUN apt-get -y update
##RUN apt-get install -y --fix-missing \
##    build-essential \
##    apt-utils \
##    cmake \
##    wget \
##    pkg-config \
##    python-dev \
##    && apt-get clean && rm -rf /tmp/* /var/tmp/*
#
#COPY requirements.txt .
#RUN pip install -r requirements.txt
#
#COPY . .
#
##CMD ["gunicorn", "--bind", "0.0.0.0:5555", "--workers", "4", "--timeout", "600", "run:app"]
#CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5555"]

FROM python:3.8
EXPOSE 5555
WORKDIR /usr/src/app/server

COPY requirements.txt .
RUN pip install -r requirements.txt -f  https://download.pytorch.org/whl/torch_stable.html
COPY . .
RUN python download.py
CMD ["/bin/bash"]

ENTRYPOINT gunicorn --workers 4 run:app --bind 0.0.0.0:5555

#ENTRYPOINT ["./gunicorn.sh"]


#CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5555"]
