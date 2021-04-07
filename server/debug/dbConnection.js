import pool from './dbAuth.js';
/* Helper file to setup database on the first time */

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Products Table
 */
const createExperimentRecordsTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS PRODUCTS
  (
    id SERIAL NOT NULL PRIMARY KEY  ,
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
  );`;

  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Raw Material Table
 */
/* const createRMTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS RAW_MATERIALS ( 
	raw_material_id      integer NOT NULL  PRIMARY KEY  ,
	experiment_record_id integer NOT NULL    ,
	raw_material_name    varchar(256) NOT NULL DEFAULT '-'   ,
	percentage_w         double precision NOT NULL DEFAULT 0   ,
	raw_material_lot     varchar(50)     ,
	AR                   double precision NOT NULL DEFAULT 0   ,
	AD                   double precision NOT NULL DEFAULT 0   ,
	notes                varchar(600)     ,
	time_added           timestamp     ,
	FOREIGN KEY ( experiment_record_id ) REFERENCES EXPERIMENT_RECORDS( record_id )  
 );`;

  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}; */

/**
 * Create Hydrogren Peroxide Table
 */
/* const createHPTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS HYDROGEN_PEROXIDE_DATA ( 
	hp_id                integer NOT NULL  PRIMARY KEY  ,
	experiment_record_id integer NOT NULL    ,
	hp_type              integer NOT NULL DEFAULT -1   ,
	experiment_name      varchar(256) NOT NULL DEFAULT '-'   ,
	N                    double precision NOT NULL DEFAULT 0   ,
	M                    double precision DEFAULT 0   ,
	vol_change           double precision    ,
	H2O2                 double precision NOT NULL DEFAULT 0   ,
	PH                   double precision     ,
	accepted_range       varchar(50)     ,
	date                 date     ,
	initials             varchar(50)     ,
	conditions           varchar(256)     ,
	SG                   varchar(256)     ,
	FOREIGN KEY ( experiment_record_id ) REFERENCES experiment_records( record_id )  
 );
`; */

  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Experiment Records Table
 */
const dropExperimentRecordsTable = () => {
  const query = 'DROP TABLE IF EXISTS experiment_records';
  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Raw Materials Table
 */
const dropRMTable = () => {
  const query = 'DROP TABLE IF EXISTS raw_materials';
  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Hydrogen Peroxide Table
 */
const dropHPTable = () => {
  const query = 'DROP TABLE IF EXISTS hydrogen_peroxide_data';
  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createExperimentRecordsTable();
  createRMTable();
  createHPTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropExperimentRecordsTable();
  dropRMTable();
  dropHPTable();
};

pool.on('remove', () => {
  console.log('user removed');
  process.exit(0);
});


export {
  createAllTables,
  dropAllTables,
};

require('make-runnable');