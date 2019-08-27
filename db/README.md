# Caravela Website (setsail) - Database

> O Caravela HC precisa de um meio visual e único de expor seus projetos em andamento, propostas, apresentação, dentre outras coisas mais. Para isso, um site está sendo desenvolvido para melhorar sua divulgação e alcance.
> @jptiz

## Database Schema

Database was implemented on PostgreSQL, so some things we'll be different from another SGBD's e.g. SERIAL field 

### Crew ('crew' table)

Field name  | Field type   | Description
------------| -------------| -------------
id          | SERIAL       | Self explained 
name        | VARCHAR      | Username on github 
github      | TEXT         | Profile url 
pic         | TEXT         | Avatar image url 
description | TEXT         | Bio on github 
created_at  | TIMESTAMP    | First joined 
updated_at  | TIMESTAMP    | Last time data was updated 
deleted_at  | TIMESTAMP    | When user was OBLITERATED

### Events ('events' table)

Field name  | Field type   | Description
------------| -------------| -------------
id          | SERIAL       | Self explained 
event_data  | TIMESTAMP    | Self explained  
name        | VARCHAR      | Event title  
description | TEXT         | Self explained 
cover       | TEXT         | Image cover url

### Posts ('posts' table)

Field name  | Field type   | Description
------------| -------------| -------------
id          | SERIAL       | Self explained 
sha         | VARCHAR      | github's file hash 
name        | VARCHAR      | Post title  
cover       | TEXT         | Cover image url 
content     | TEXT         | File content in base64 
created_at  | TIMESTAMP    | First joined 
updated_at  | TIMESTAMP    | Last time data was updated

### Images ('images' table)

Field name  | Field type   | Description
------------| -------------| -------------
id          | SERIAL       | Self explained 
title       | VARCHAR      | Image title  
url         | TEXT         | Image url 
link        | TEXT         | Link if image is clicked (nullable) 
active      | BOOLEAN      | Self explained 
mobile      | BOOLEAN      | Self explained