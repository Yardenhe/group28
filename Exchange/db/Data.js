const users = [
  {
    email: "user1@example.com",
    name: "John",
    last_name: "Doe",
    phone_number: "0501234567",
    birthdate: "1990-01-01",
    username: "user1",
    password: "myPassword123",
  },
  {
    email: "user2@example.com",
    name: "Jane",
    last_name: "Smith",
    phone_number: "0529876543",
    birthdate: "1995-02-15",
    username: "user2",
    password: "myPassword456",
  },
  {
    email: "user3@example.com",
    name: "David",
    last_name: "Johnson",
    phone_number: "0527654321",
    birthdate: "1988-07-10",
    username: "user3",
    password: "myPassword789",
  },
  {
    email: "user4@example.com",
    name: "Emily",
    last_name: "Brown",
    phone_number: "0508765432",
    birthdate: "1992-04-22",
    username: "user4",
    password: "myPasswordabc",
  },
  {
    email: "user5@example.com",
    name: "Michael",
    last_name: "Wilson",
    phone_number: "0528765432",
    birthdate: "1985-12-05",
    username: "user5",
    password: "myPasswordxyz",
  },
  {
    email: "user6@example.com",
    name: "Emma",
    last_name: "Davis",
    phone_number: "0509876543",
    birthdate: "1993-09-18",
    username: "user6",
    password: "myPassword123",
  },
  {
    email: "user7@example.com",
    name: "Daniel",
    last_name: "Taylor",
    phone_number: "0521234567",
    birthdate: "1991-03-25",
    username: "user7",
    password: "myPassword456",
  },
  {
    email: "user8@example.com",
    name: "Olivia",
    last_name: "Anderson",
    phone_number: "0523456789",
    birthdate: "1994-08-14",
    username: "user8",
    password: "myPassword789",
  },
  {
    email: "user9@example.com",
    name: "William",
    last_name: "Lee",
    phone_number: "0506789012",
    birthdate: "1987-06-30",
    username: "user9",
    password: "myPasswordabc",
  },
  {
    email: "user10@example.com",
    name: "Sophia",
    last_name: "Clark",
    phone_number: "0527021440",
    birthdate: "1996-11-12",
    username: "user10",
    password: "myPasswordxyz",
  },
  {
    email: "noa.cohen@example.com",
    name: "Noa",
    last_name: "Cohen",
    phone_number: "0521234567",
    birthdate: "1990-05-25",
    username: "noa.cohen",
    password: "myPassword123",
  },
  {
    email: "yosef.levi@example.com",
    name: "Yosef",
    last_name: "Levi",
    phone_number: "0522345678",
    birthdate: "1985-12-10",
    username: "yosef.levi",
    password: "myPassword456",
  },
  {
    email: "maya.avraham@example.com",
    name: "Maya",
    last_name: "Avraham",
    phone_number: "0523456789",
    birthdate: "1992-09-17",
    username: "maya.avraham",
    password: "myPassword789",
  },
  {
    email: "lior.cohen@example.com",
    name: "Lior",
    last_name: "Cohen",
    phone_number: "0524567890",
    birthdate: "1993-07-08",
    username: "lior.cohen",
    password: "myPasswordabc",
  },
  {
    email: "roni.levi@example.com",
    name: "Roni",
    last_name: "Levi",
    phone_number: "0525678901",
    birthdate: "1991-03-15",
    username: "roni.levi",
    password: "myPassworddef",
  },
  {
    email: "shira.avraham@example.com",
    name: "Shira",
    last_name: "Avraham",
    phone_number: "0526789012",
    birthdate: "1994-11-22",
    username: "shira.avraham",
    password: "myPasswordxyz",
  },
  {
    email: "tomer.cohen@example.com",
    name: "Tomer",
    last_name: "Cohen",
    phone_number: "0527890123",
    birthdate: "1990-06-18",
    username: "tomer.cohen",
    password: "myPassword123",
  },
  {
    email: "shani.levi@example.com",
    name: "Shani",
    last_name: "Levi",
    phone_number: "0528901234",
    birthdate: "1988-02-04",
    username: "shani.levi",
    password: "myPassword456",
  },
  {
    email: "or.avraham@example.com",
    name: "Or",
    last_name: "Avraham",
    phone_number: "0529012345",
    birthdate: "1992-09-10",
    username: "or.avraham",
    password: "myPassword789",
  },
  {
    email: "liat.cohen@example.com",
    name: "Liat",
    last_name: "Cohen",
    phone_number: "0520123456",
    birthdate: "1987-04-28",
    username: "liat.cohen",
    password: "myPasswordabc",
  },
  {
    email: "omer.levi@example.com",
    name: "Omer",
    last_name: "Levi",
    phone_number: "0521234567",
    birthdate: "1993-01-12",
    username: "omer.levi",
    password: "myPassworddef",
  },
  {
    email: "maayan.avraham@example.com",
    name: "Maayan",
    last_name: "Avraham",
    phone_number: "0522345678",
    birthdate: "1991-08-20",
    username: "maayan.avraham",
    password: "myPasswordxyz",
  },
  {
    email: "david.cohen@example.com",
    name: "David",
    last_name: "Cohen",
    phone_number: "0523456789",
    birthdate: "1989-05-07",
    username: "david.cohen",
    password: "myPassword123",
  },
];
const currencies = [
  {
    currency_id: 1,
    currency_code: "USD",
    currency_name: "United States Dollar",
    currency_symbol: "$",
  },
  {
    currency_id: 2,
    currency_code: "EUR",
    currency_name: "Euro",
    currency_symbol: "€",
  },
  {
    currency_id: 3,
    currency_code: "GBP",
    currency_name: "British Pound Sterling",
    currency_symbol: "£",
  },
  {
    currency_id: 4,
    currency_code: "JPY",
    currency_name: "Japanese Yen",
    currency_symbol: "¥",
  },
  {
    currency_id: 5,
    currency_code: "CAD",
    currency_name: "Canadian Dollar",
    currency_symbol: "CA$",
  },
  {
    currency_id: 6,
    currency_code: "AUD",
    currency_name: "Australian Dollar",
    currency_symbol: "A$",
  },
  {
    currency_id: 7,
    currency_code: "CHF",
    currency_name: "Swiss Franc",
    currency_symbol: "CHF",
  },
  {
    currency_id: 8,
    currency_code: "NZD",
    currency_name: "New Zealand Dollar",
    currency_symbol: "NZ$",
  },
  {
    currency_id: 9,
    currency_code: "ILS",
    currency_name: "Israeli Shekel",
    currency_symbol: "₪",
  },
  {
    currency_id: 10,
    currency_code: "SEK",
    currency_name: "Swedish Krona",
    currency_symbol: "kr",
  },
];
const transactions = [
  {
    date: "2023-06-01",
    city: "Tel Aviv",
    address: "123 Main Street",
    from_currency_id: 1,
    to_currency_id: 2,
    amount: 100.5,
    status: "Pending",
    from_user_id: 1,
    to_user_id: null,
  },
  {
    date: "2023-06-02",
    city: "Jerusalem",
    address: "456 Oak Avenue",
    from_currency_id: 2,
    to_currency_id: 3,
    amount: 250.75,
    status: "Pending",
    from_user_id: 3,
    to_user_id: null,
  },
  {
    date: "2023-06-03",
    city: "Tel Aviv",
    address: "789 Elm Road",
    from_currency_id: 3,
    to_currency_id: 1,
    amount: 50.25,
    status: "Pending",
    from_user_id: 2,
    to_user_id: null,
  },
  {
    date: "2023-06-04",
    city: "Haifa",
    address: "321 Cedar Lane",
    from_currency_id: 1,
    to_currency_id: 3,
    amount: 75.0,
    status: "Pending",
    from_user_id: 1,
    to_user_id: null,
  },
  {
    date: "2023-06-05",
    city: "Tel Aviv",
    address: "567 Pine Street",
    from_currency_id: 2,
    to_currency_id: 1,
    amount: 150.0,
    status: "Pending",
    from_user_id: 3,
    to_user_id: null,
  },
  {
    date: "2023-06-06",
    city: "Jerusalem",
    address: "987 Maple Avenue",
    from_currency_id: 3,
    to_currency_id: 2,
    amount: 200.5,
    status: "Pending",
    from_user_id: 2,
    to_user_id: null,
  },
  {
    date: "2023-06-07",
    city: "Tel Aviv",
    address: "654 Oak Road",
    from_currency_id: 1,
    to_currency_id: 2,
    amount: 300.75,
    status: "Pending",
    from_user_id: 1,
    to_user_id: null,
  },
  {
    date: "2023-06-08",
    city: "Haifa",
    address: "789 Elm Street",
    from_currency_id: 2,
    to_currency_id: 3,
    amount: 175.25,
    status: "Pending",
    from_user_id: 3,
    to_user_id: null,
  },
  {
    date: "2023-06-01",
    city: "Tel Aviv",
    address: "123 Rothschild Boulevard",
    from_currency_id: 1,
    to_currency_id: 2,
    amount: 100.5,
    status: "Pending",
    from_user_id: 1,
    to_user_id: null,
  },
  {
    date: "2023-06-02",
    city: "Jerusalem",
    address: "456 Ben Yehuda Street",
    from_currency_id: 2,
    to_currency_id: 3,
    amount: 250.75,
    status: "Pending",
    from_user_id: 3,
    to_user_id: null,
  },
  {
    date: "2023-06-03",
    city: "Tel Aviv",
    address: "789 Dizengoff Street",
    from_currency_id: 3,
    to_currency_id: 1,
    amount: 50.25,
    status: "Pending",
    from_user_id: 2,
    to_user_id: null,
  },
  {
    date: "2023-06-04",
    city: "Haifa",
    address: "321 Herzl Street",
    from_currency_id: 1,
    to_currency_id: 3,
    amount: 75.0,
    status: "Pending",
    from_user_id: 1,
    to_user_id: null,
  },
  {
    date: "2023-06-05",
    city: "Tel Aviv",
    address: "567 Allenby Street",
    from_currency_id: 4,
    to_currency_id: 5,
    amount: 150.35,
    status: "Pending",
    from_user_id: 4,
    to_user_id: null,
  },
  {
    date: "2023-06-06",
    city: "Jerusalem",
    address: "890 Jaffa Street",
    from_currency_id: 5,
    to_currency_id: 6,
    amount: 300.0,
    status: "Pending",
    from_user_id: 6,
    to_user_id: null,
  },
  {
    date: "2023-06-07",
    city: "Tel Aviv",
    address: "123 Ibn Gabirol Street",
    from_currency_id: 6,
    to_currency_id: 4,
    amount: 75.75,
    status: "Pending",
    from_user_id: 5,
    to_user_id: null,
  },
  {
    date: "2023-06-08",
    city: "Haifa",
    address: "456 HaNassi Boulevard",
    from_currency_id: 4,
    to_currency_id: 6,
    amount: 120.0,
    status: "Pending",
    from_user_id: 4,
    to_user_id: null,
  },
  {
    date: "2023-06-09",
    city: "Tel Aviv",
    address: "789 Shaul HaMelech Street",
    from_currency_id: 7,
    to_currency_id: 8,
    amount: 90.5,
    status: "Pending",
    from_user_id: 7,
    to_user_id: null,
  },
  {
    date: "2023-06-11",
    city: "Haifa",
    address: "123 Rothschild Street",
    from_currency_id: 1,
    to_currency_id: 2,
    amount: 150.5,
    status: "Pending",
    from_user_id: 8,
    to_user_id: null,
  },
  {
    date: "2023-06-12",
    city: "Tel Aviv",
    address: "456 Allenby Avenue",
    from_currency_id: 2,
    to_currency_id: 3,
    amount: 300.75,
    status: "Pending",
    from_user_id: 9,
    to_user_id: null,
  },
  {
    date: "2023-06-13",
    city: "Jerusalem",
    address: "789 Dizengoff Boulevard",
    from_currency_id: 3,
    to_currency_id: 1,
    amount: 80.25,
    status: "Pending",
    from_user_id: 10,
    to_user_id: null,
  },
  {
    date: "2023-06-14",
    city: "Tel Aviv",
    address: "321 HaNassi Street",
    from_currency_id: 1,
    to_currency_id: 3,
    amount: 120.0,
    status: "Pending",
    from_user_id: 11,
    to_user_id: null,
  },
  {
    date: "2023-06-15",
    city: "Haifa",
    address: "567 Ben Yehuda Boulevard",
    from_currency_id: 4,
    to_currency_id: 5,
    amount: 200.35,
    status: "Pending",
    from_user_id: 12,
    to_user_id: null,
  },
  {
    date: "2023-06-16",
    city: "Tel Aviv",
    address: "890 Allenby Lane",
    from_currency_id: 5,
    to_currency_id: 6,
    amount: 350.0,
    status: "Pending",
    from_user_id: 13,
    to_user_id: null,
  },
  {
    date: "2023-06-17",
    city: "Jerusalem",
    address: "123 HaNassi Street",
    from_currency_id: 6,
    to_currency_id: 4,
    amount: 100.75,
    status: "Pending",
    from_user_id: 14,
    to_user_id: null,
  },
  {
    date: "2023-06-18",
    city: "Tel Aviv",
    address: "456 Rothschild Lane",
    from_currency_id: 4,
    to_currency_id: 6,
    amount: 180.0,
    status: "Pending",
    from_user_id: 15,
    to_user_id: null,
  },
  {
    date: "2023-06-19",
    city: "Haifa",
    address: "789 Dizengoff Street",
    from_currency_id: 7,
    to_currency_id: 8,
    amount: 110.5,
    status: "Pending",
    from_user_id: 16,
    to_user_id: null,
  },
  {
    date: "2023-06-20",
    city: "Jerusalem",
    address: "321 Allenby Avenue",
    from_currency_id: 8,
    to_currency_id: 9,
    amount: 250.25,
    status: "Pending",
    from_user_id: 17,
    to_user_id: null,
  },
  {
    date: "2023-06-21",
    city: "Modiin",
    address: "123 Herzl Boulevard",
    from_currency_id: 1,
    to_currency_id: 2,
    amount: 175.5,
    status: "Pending",
    from_user_id: 18,
    to_user_id: null,
  },
  {
    date: "2023-06-22",
    city: "Beer Sheva",
    address: "456 Rothschild Avenue",
    from_currency_id: 2,
    to_currency_id: 3,
    amount: 400.75,
    status: "Pending",
    from_user_id: 19,
    to_user_id: null,
  },
  {
    date: "2023-06-23",
    city: "Netanya",
    address: "789 Ben Gurion Street",
    from_currency_id: 3,
    to_currency_id: 1,
    amount: 120.25,
    status: "Pending",
    from_user_id: 20,
    to_user_id: null,
  },
  {
    date: "2023-06-24",
    city: "Ashdod",
    address: "321 Allenby Boulevard",
    from_currency_id: 1,
    to_currency_id: 3,
    amount: 90.0,
    status: "Pending",
    from_user_id: 21,
    to_user_id: null,
  },
  {
    date: "2023-06-25",
    city: "Eilat",
    address: "567 HaYam Street",
    from_currency_id: 4,
    to_currency_id: 5,
    amount: 250.35,
    status: "Pending",
    from_user_id: 22,
    to_user_id: null,
  },
  {
    date: "2023-06-26",
    city: "Herzliya",
    address: "890 Dizengoff Avenue",
    from_currency_id: 5,
    to_currency_id: 6,
    amount: 400.0,
    status: "Pending",
    from_user_id: 23,
    to_user_id: null,
  },
  {
    date: "2023-06-27",
    city: "Rishon LeZion",
    address: "123 HaNassi Boulevard",
    from_currency_id: 6,
    to_currency_id: 4,
    amount: 130.75,
    status: "Pending",
    from_user_id: 1,
    to_user_id: null,
  },
  {
    date: "2023-06-28",
    city: "Haifa",
    address: "456 Allenby Street",
    from_currency_id: 4,
    to_currency_id: 6,
    amount: 220.0,
    status: "Pending",
    from_user_id: 2,
    to_user_id: null,
  },
  {
    date: "2023-06-29",
    city: "Petah Tikva",
    address: "789 Herzl Avenue",
    from_currency_id: 7,
    to_currency_id: 8,
    amount: 130.5,
    status: "Pending",
    from_user_id: 3,
    to_user_id: null,
  },
  {
    date: "2023-06-30",
    city: "Rehovot",
    address: "321 Rothschild Street",
    from_currency_id: 8,
    to_currency_id: 9,
    amount: 300.25,
    status: "Pending",
    from_user_id: 4,
    to_user_id: null,
  },
];
module.exports = { users, currencies, transactions };