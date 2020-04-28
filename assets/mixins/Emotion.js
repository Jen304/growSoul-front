export default {
    methods: {
        getColor(emotion) {
            return this.$store.state.emotion.emotionColors[emotion];
        },
        getEmotionString(emotion) {
            return this.$store.state.emotion.emotionString[emotion];
        },
        getEmotionIcon(emotion) {
            return this.$store.state.emotion.emotionIcons[emotion];
        }
    }

}