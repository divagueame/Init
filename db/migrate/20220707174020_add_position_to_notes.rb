class AddPositionToNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :notes, :position, :integer
    Note.order(:updated_at).each.with_index(1) do |note, index|
      note.update_column :position, index
    end
  end
end
