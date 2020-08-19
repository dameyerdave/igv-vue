import Vue from 'vue'
import App from '@/App.vue'
import igv from '@/index'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(igv, {
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

Vue.use(VModal)

new Vue({
	render: h => h(App)
}).$mount('#app')
