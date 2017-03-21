localStorage.clear();
// Read https://github.com/amark/gun/wiki/Graphs

var gun = Gun();

var alice = gun.get('person/alice').put({
  name: 'alice',
  age: 22
});
var bob = gun.get('person/bob').put({
  name: 'bob',
  age: 24
});
var carl = gun.get('person/carl').put({
  name: 'carl',
  age: 16
});
var dave = gun.get('person/dave').put({
  name: 'dave',
  age: 42
});

alice.on(function (node) {
  //console.log('Subscribed to Alice!', node);
});

gun.get('person/bob').val(function (node) {
  //console.log('Bob!', node);
});

var people = gun.get('people');
people.set(alice);
people.set(bob);
people.set(carl);
people.set(dave);

people.map().val(function (person) {
  //console.log("The person is", person);
});

var company = gun.get('startup/hype').put({
  name: "hype",
  profitable: false,
  address: {
    street: "123 Hipster Lane",
    city: "San Francisco",
    state: "CA",
    country: "USA"
  }
});

company.val(function (startup) {
  //console.log("The startup:", startup);
});

company.path('address.city').val(function (value, field) {
  //console.log("What is the city?", value);
});

gun.get('startup/hype').put({ // or you could do `company.put({` instead.
  funded: true,
  address: {
    street: "999 Expensive Boulevard"
  }
});

var employees = company.path('employees');
employees.set(dave);
employees.set(alice);
employees.set(bob);

alice.path('spouse').put(bob);
bob.path('spouse').put(alice);

alice.path('spouse').path('employer').put(company);
alice.path('employer').put(company);

dave.path('kids').set(carl);
carl.path('dad').put(dave);

carl.path('friends').set(alice);
carl.path('friends').set(bob);

gun.get('person/alice').path('spouse.employer.employees').map().path('name').val(function (data, key) {
  console.log("The employee's", key, data);
});