import queryDb from './postgres';

// TODO: change to use postgres prepared statement
export function getCustomer(customer_id: string): Promise<string[]> {
  const queryString: string = `
  SELECT customer_id, first_name, last_name, mail
  FROM customers
  WHERE customer_id = '${customer_id}'
  `; // note: basic string formatting is NOT save against SQL-injections
  return queryDb(queryString, []);
}

// NOTE: the typescript typing is not correct here, or in most other parts of the app, due to time reasons
export function getAllCustomers(): Promise<Array<Array<string>>> {
  // aggregate by tss ids directly in database
  const queryString = `
    SELECT
      customer_id,
      first_name,
      last_name,
      mail,
      array_agg(tss_id) AS tss_ids
    FROM customers
    GROUP BY customer_id, first_name, last_name, mail;
  `;
  return queryDb(queryString, []);
}

export function doesCustomerExist(customerId: string): Promise<any[]> {
  const queryString = `
      SELECT EXISTS(
        SELECT * from customers where customer_id = $1
    )
  `;

  return queryDb(queryString, [customerId]);
}

// NOTE: I would suggest normalizing the database schema, or directly adding the TSS-IDs as an array in the db
// the schema doesnt really make a lot of sense like this
// I'm just selecting any row of customer with this id and take firstname, lastname, mail from there
export function insertTssIdToCustomer(customerId: string, newTssId: string): Promise<any[]> {
  const queryString = `
    INSERT INTO customers (customer_id, first_name, last_name, mail, tss_id)
    SELECT customer_id, first_name, last_name, mail, $1
    FROM customers
    WHERE customer_id = $2
    LIMIT 1
    RETURNING *;
  `;

  return queryDb(queryString, [newTssId, customerId]);
}
