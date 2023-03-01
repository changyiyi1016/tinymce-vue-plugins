import * as Buttons from './ui/Buttons';
import * as Commands from './api/Commands';
import * as DragDrop from './core/DragDrop';

declare const tinymce: any;
export default (function () {
    tinymce.PluginManager.add('attachment', function (editor) {
        Buttons.setup(editor);
        Commands.register(editor);
        DragDrop.setup(editor);
    });
})();
