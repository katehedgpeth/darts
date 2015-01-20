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

ActiveRecord::Schema.define(version: 20150119175812) do

  create_table "practices", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "total_shot_count"
    t.integer  "total_hit_count"
    t.integer  "total_miss_count"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "shots", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "practice_id"
    t.integer  "turn_id"
    t.integer  "aiming_for"
    t.integer  "hit"
    t.float    "hit_x"
    t.float    "hit_y"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "hit_number"
    t.string   "hit_section"
  end

  create_table "turns", force: :cascade do |t|
    t.integer  "practice_id"
    t.integer  "user_id"
    t.integer  "aiming_for"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "username"
    t.string   "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
