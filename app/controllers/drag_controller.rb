class DragController < ApplicationController
  def note
    @note = Note.find(drag_note_params[:id])
    @note.insert_at(drag_note_params[:position].to_i + 1)
  end

  private

  def drag_note_params
    params.require(:resource).permit(:id, :position)
  end
end
