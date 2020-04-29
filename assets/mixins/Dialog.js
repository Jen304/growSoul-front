// Dialog mixins: use for open and close the dialog (emotion form) to edit emotion
// Local dialog: only available to some components
export default {
    data() {
        return {
            selectedEmotion: {},
            dialog: null,
            emotionKey: null,

        }
    },
    methods: {
        openDialog(emotion) {
            const open = () => {
                this.selectedEmotion = emotion;
                // assign new key to force re-render
                this.emotionKey = emotion.created_at;
                this.dialog = true;
            };
            if (this.dialog) {
                this.dialog = false;
                setTimeout(open, 10);
            } else {
                open();
            }

        }
    }
}