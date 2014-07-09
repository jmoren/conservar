# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140709005611) do

  create_table "collections", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "organization_id"
  end

  create_table "exams", force: true do |t|
    t.integer  "treatment_id"
    t.integer  "item_id"
    t.string   "name"
    t.text     "result"
    t.text     "observations"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "organization_id"
  end

  create_table "images", force: true do |t|
    t.integer  "item_id"
    t.integer  "treatment_id"
    t.string   "photo"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "intervention_id"
    t.integer  "organization_id"
  end

  create_table "interventions", force: true do |t|
    t.integer  "treatment_id"
    t.integer  "item_id"
    t.text     "description"
    t.string   "intervention_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "materials"
    t.date     "intervention_date"
  end

  create_table "item_details", force: true do |t|
    t.string   "name"
    t.string   "value"
    t.string   "detail_type"
    t.integer  "item_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "items", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "collection_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "cover"
    t.integer  "organization_id"
  end

  create_table "organizations", force: true do |t|
    t.string   "name"
    t.string   "address"
    t.string   "contact_email"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "reports", force: true do |t|
    t.integer  "collection_id"
    t.string   "pdf"
    t.integer  "total_downloads", default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "organization_id"
  end

  create_table "treatment_notes", force: true do |t|
    t.integer  "treatment_id"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "treatments", force: true do |t|
    t.integer  "item_id"
    t.text     "diagnosis"
    t.text     "proposal"
    t.datetime "closed_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "organization_id"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "organization_id"
    t.string   "name"
    t.string   "last_name"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
