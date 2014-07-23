# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

organization = Organization.create(name: "Conservar S.A")

collections = Collection.create([
  {
    name: "Item 1", description: "Este es el item 1 de test", origin: "Buenos Aires", 
    owner: "Pepe Argento", entry_date: Date.today - 15.days, organization_id: organization.id },
  {
    name: "Item 2", description: "Este es el item 2 de test", origin: "Buenos Aires", 
    owner: "Pepe Argento", entry_date: Date.today - 14.days, organization_id: organization.id },
  {
    name: "Item 3", description: "Este es el item 3 de test", origin: "Buenos Aires", 
    owner: "Pepe Argento", entry_date: Date.today - 13.days, organization_id: organization.id },
  {
    name: "Item 4", description: "Este es el item 4 de test", origin: "Buenos Aires", 
    owner: "Pepe Argento", entry_date: Date.today - 12.days, organization_id: organization.id },
  {
    name: "Item 5", description: "Este es el item 5 de test", origin: "Buenos Aires", 
    owner: "Pepe Argento", entry_date: Date.today - 11.days, organization_id: organization.id },
  {
    name: "Item 6", description: "Este es el item 6 de test", origin: "Buenos Aires", 
    owner: "Pepe Argento", entry_date: Date.today - 10.days, organization_id: organization.id },
  {
    name: "Item 7", description: "Este es el item 7 de test", origin: "Buenos Aires", 
    owner: "Pepe Argento", entry_date: Date.today - 9.days, organization_id: organization.id },
  {
    name: "Item 8", description: "Este es el item 8 de test", origin: "Buenos Aires", 
    owner: "Pepe Argento", entry_date: Date.today - 8.days, organization_id: organization.id },
  {
    name: "Item 9", description: "Este es el item 9 de test", origin: "Buenos Aires", 
    owner: "Pepe Argento", entry_date: Date.today - 7.days, organization_id: organization.id },
])

Collection.all.each do |collection|
  5.times do |n|
    collection.items.create(
      name: "Pieza #{n+1+collection.id}", 
      description: "este es una parte del item #{n+1+collection.id}", 
      organization_id: organization.id
    )
  end
end