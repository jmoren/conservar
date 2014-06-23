require 'test_helper'

class TreatmentNotesControllerTest < ActionController::TestCase
  setup do
    @treatment_note = treatment_notes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:treatment_notes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create treatment_note" do
    assert_difference('TreatmentNote.count') do
      post :create, treatment_note: { content: @treatment_note.content, treatment_id: @treatment_note.treatment_id }
    end

    assert_redirected_to treatment_note_path(assigns(:treatment_note))
  end

  test "should show treatment_note" do
    get :show, id: @treatment_note
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @treatment_note
    assert_response :success
  end

  test "should update treatment_note" do
    patch :update, id: @treatment_note, treatment_note: { content: @treatment_note.content, treatment_id: @treatment_note.treatment_id }
    assert_redirected_to treatment_note_path(assigns(:treatment_note))
  end

  test "should destroy treatment_note" do
    assert_difference('TreatmentNote.count', -1) do
      delete :destroy, id: @treatment_note
    end

    assert_redirected_to treatment_notes_path
  end
end
