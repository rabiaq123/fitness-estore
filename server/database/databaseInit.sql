CREATE TABLE PRODUCTS
(
	product_id SERIAL NOT NULL PRIMARY KEY  ,
	product_name varchar(256) NOT NULL DEFAULT ''   ,
	product_description varchar(600) DEFAULT '',
	image_url varchar (256),
	category varchar(256) NOT NULL DEFAULT 'Others',
	quantity int NOT NULL DEFAULT 0   ,
	price double precision NOT NULL DEFAULT 0   ,
	rating varchar(256)     ,
	date_created timestamp NOT NULL DEFAULT '1/1/11'   ,
	date_updated timestamp DEFAULT '1/1/11',
	notes varchar(600)
);