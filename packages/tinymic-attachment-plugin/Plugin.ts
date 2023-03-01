import * as Buttons from './file/ui/Buttons';
import * as Commands from './file/api/Commands';
import * as DragDrop from './file/core/DragDrop';

declare const tinymce: any;
export default function () {
    tinymce.PluginManager.add('attachment', function (editor) {
        Buttons.setup(editor);
        Commands.register(editor);
        DragDrop.setup(editor);
    });
}
