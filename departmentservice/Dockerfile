FROM python:3.6-alpine

RUN apk update

ENV FLASK_RUN_PORT 5001
ENV FLASK_APP app.py
ENV FLASK_ENV docker
ENV PYTHONUNBUFFERED 1

# You must set WORKON_HOME before running pipenv anything.
ENV WORKON_HOME /venv
RUN mkdir -p /venv

RUN mkdir -p /app
WORKDIR /app

COPY Pipfile /app
COPY Pipfile.lock /app

RUN pip install --upgrade pip==18.0 && \
    pip install --upgrade pipenv==2018.10.13 && \
    pipenv install --three --deploy --ignore-pipfile

COPY . /app

EXPOSE 5001

ENTRYPOINT ["pipenv", "run"]

CMD ["pipenv", "run", "gunicorn", "-b 0.0.0.0:5001", "app:app"]
