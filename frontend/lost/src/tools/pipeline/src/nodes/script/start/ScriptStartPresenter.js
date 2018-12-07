import BaseNodePresenter from '../../BaseNodePresenter'

import ScriptStartModel from './ScriptStartModel'
import ScriptStartView from './ScriptStartView'
import ScriptStartModal from './ScriptStartModal'


export default class ScriptStartPresenter extends BaseNodePresenter {
    constructor(graph, data, mode) {
		const model = new ScriptStartModel(data, mode)
		const view = new ScriptStartView(model)
		const modal = new ScriptStartModal(model)
        super({ graph, model, view, modal })
    }
    /**
     * @override
     */
    initViewBinding(){
		$(this.modal.html.root).on('hidden.bs.modal', () => {
			console.log('validated?', this.isValidated())
			this.view.setColor(this.isValidated())
			this.graph.updateNode(this)
		})
	}
	/**
     * @override
     */
    initModelBinding(){}
}




