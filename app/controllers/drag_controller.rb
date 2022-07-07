class DragController < ApplicationController
  def note; end

  private

  def drag_note_params
    params.require(:note).permit(:id, :position)
  end
end
