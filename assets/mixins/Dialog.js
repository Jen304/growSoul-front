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