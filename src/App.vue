<template>
<div>
    <button @click="show = !show">toggle</button>
    <button @click="$igv.browser('two').search('chr1:102987575-102987633')">search</button>
    <button @click="$igv.destroy('two')">destroy</button>
	<igv-modal id='modalIgv' v-model="show" @ready="loadTracks"/>
</div>
</template>

<script>
export default {
	data() {
		return {
			show: false
		}
	},
	methods: {
		async loadTracks(id) {
			await this.$igv.loadBed(id, '/OTOgenics_V4_Covered_liftOver_hg19_hg38_Padded.sorted.bed.gz', '/OTOgenics_V4_Covered_liftOver_hg19_hg38_Padded.sorted.bed.gz.tbi')
			await this.$igv.loadBam(id, '/P02912-1.bam', '/P02912-1.bam.bai')
			this.$igv.search(id, 'chr1:169,468,400-169,468,450')
		}
	}
}
</script>

<style>
</style>
