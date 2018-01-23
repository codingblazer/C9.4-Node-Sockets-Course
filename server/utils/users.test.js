const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{

  beforeEach(()=>{
    users = new Users();
    users.users = [
      {id:1,name:'Mike',room:'React'},
      {id:2,name:'Sachin',room:'Node'},
      {id:3,name:'Rahul',room:'React'}
    ];
  });

  it('shoudl find the user',()=>{
    var userid = 3;
    var user = users.getUser(userid);
    expect(user.id).toBe(userid);
  });

  it('should remove the user',()=>{
    var userid = 1;
    var user = users.removeUser(userid);
    expect(user.id).toBe(userid);
  });

  it('should add new user',()=>{
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andrew',
      room: 'The office fans'
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for the node',()=>{
    var userlist = users.getUserList('Node');
    expect(userlist).toEqual(['Sachin']);
  });

  });
