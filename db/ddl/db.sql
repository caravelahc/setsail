CREATE DATABASE IF NOT EXISTS setsail;

CREATE TABLE IF NOT EXISTS crew (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    github TEXT NOT NULL, 
    pic TEXT NOT NULL, 
    description TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    sha VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL, 
    content TEXT NOT NULL,
    cover TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
)

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    event_data TIMESTAMP NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover TEXT
)

CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    link TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT FALSE,
    mobile BOOLEAN NOT NULL DEFAULT FALSE
)