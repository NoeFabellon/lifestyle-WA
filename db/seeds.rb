# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


person = Person.create({
  first_name: "Admin",
  last_name: "User"
})

user = User.create({
  email: "admin@example.com",
  password: "password",
  password_confirmation: "password",
  person_id: person.id
})



puts "people #{Person.count}"
puts "users #{User.count}"
puts "posts #{Post.count}"
puts "Settings #{Setting.count}"
