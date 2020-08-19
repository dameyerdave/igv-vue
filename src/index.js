import igv from 'igv'
import IgvModal from '@/components/IgvModal.vue'

export default {
	install (Vue, options) {
		Vue.component('igv-modal', IgvModal)
		Vue.prototype.$igv = {
			_baseUrl: options.baseUrl ? options.baseUrl : '',
			_browsers: {},
			async create (id, div) {
				if (!(id in this._browsers)) {
					this._browsers[id] = await igv.createBrowser(div, { ...options })
				}
				return this._browsers[id]
			},
			browser (id) { 
				if (id in this._browsers) {
					return this._browsers[id]
				}
				else { 
					console.warn(`IGV-browser with id ${id} does not exist!`)
					return null
				}
			},
			search (id, position) { 
				if (id in this._browsers) { 
					this._browsers[id].search(position)
				}
			},
			async loadBed (id, url, indexUrl) { 
				try {
					if (id in this._browsers) {
						this._browsers[id].loadTrack({
							type: 'annotation',
							format: 'bed',
							name: 'BED',
							url: this._baseUrl + url,
							indexURL: this._baseUrl + indexUrl,
						})
					} else { 
						console.warn(`IGV-browser with id ${id} does not exist!`)
					}
				} catch (err) { 
					console.error(err)
				}
			},
			async loadBam (id, url, indexUrl) { 
				try {
					if (id in this._browsers) {
						this._browsers[id].loadTrack({
							type: 'alignment',
							format: 'bam',
							name: 'BAM',
							url: this._baseUrl + url,
							indexURL: this._baseUrl + indexUrl
						})
					} else { 
						console.warn(`IGV-browser with id ${id} does not exist!`)
					}
				} catch (err) { 
					console.error(err)
				}
			},
			setBaseUrl (baseUrl) {
				this._baseUrl = baseUrl
			},
			setToken (token) { 
				igv.oauth.setToken(token, '*')
			},
			destroy (id = null) { 
				if (id === null) {
					igv.removeAllBrowsers()
					this._browsers = {}
				} else {
					console.log('browser-destroy', this._browsers)
					if (id in this._browsers) {
						igv.removeBrowser(this._browsers[id])
						delete this._browsers[id]
					}
				}
			}
		}
	}
}
