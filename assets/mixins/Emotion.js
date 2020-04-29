// Emotion Mixin: to get color, string and icon according to emotion value
// available globally
export default {
    methods: {
        getEmotionColor(emotion) {
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