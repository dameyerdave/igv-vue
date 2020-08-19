<template>
  <modal name="igvModal" width="90%" height="90%" @before-open="beforeOpen" @opened="opened" @before-close="beforeClose" @closed="closed">
        <div slot="top-right">
            <button class="close-button" @click="close">
                X
            </button>
        </div>
        <div ref="igvModalBrowser"></div>
    </modal>
</template>

<script>
export default {
	name: 'IgvModal',
	props: {
		id: {
			type: String,
			required: true
		},
		value: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		async createBrowser() {
			try {
				await this.$igv.create(this.id, this.$refs.igvModalBrowser)
				this.$emit('ready', this.id)
			}
			catch (err) {
				console.error(err)
			}
		},
		beforeOpen() {
			// console.log('beforeOpen')
		},
		opened() {
			// console.log('opened')
			this.createBrowser()
		},
		beforeClose() {
			// console.log('beforeClose')
			this.$igv.destroy(this.id)
			this.$emit('input', false)
		},
		closed() {
			// console.log('closed')
		},
		close() {
			this.$emit('input', false)
		}
	},
	watch: {
		value() {
			// console.log('value', this.value)
			if (this.value) {
				this.$modal.show('igvModal')
			} else {
				this.$modal.hide('igvModal')
			}
		}
	}
}
</script>