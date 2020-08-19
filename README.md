# igv-vue

## Usage

```js
import VIgv from '@/index'

Vue.use(VIgv, {
	reference: {
		'id': 'hg38',
		'name': 'Human (GRCh38/hg38)',
		'fastaURL': 'http://localhost:5000/hg38.fa',
		'indexURL': 'http://localhost:5000/hg38.fa.fai',
		'cytobandURL': 'http://localhost:5000/cytoBandIdeo.txt',
		'tracks': [
			{
				'name': 'Refseq Genes',
				'url': 'http://localhost:5000/refGene.txt.gz',
				'order': 1000000,
				'indexed': false
			}
		]
	},
	locus: 'chr1:1-2',
	showCenterGuide: true,
	baseUrl: 'http://localhost:5000'
})
```

```html
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
```
