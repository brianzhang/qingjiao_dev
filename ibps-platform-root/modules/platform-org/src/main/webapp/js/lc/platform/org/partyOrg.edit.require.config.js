// 添加业务js路径
require_base_config.paths['party.org'] = __ctx + '/js/lc/platform/org/partyOrg.edit.require';

// 初始化配置
require.config(require_base_config);

// 初始化js
var deps = ['party.org', 'css'];
if(IE8){
	deps.push('html5shiv');
	deps.push('respond');
}
require(deps, function(PartyOrg) {
	PartyOrg.init();
});