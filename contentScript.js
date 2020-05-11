var htmlObject = document.createElement('span');
htmlObject.innerHTML = `<div id="withoutResolution_ComboCasuistica_c_container" ng-repeat="field in tempLayout.allFields" class="field-container clearfix can-fold clear-both half-width" ng-if="(!field.canFold || !moreState.isFolded) &amp;&amp; !field.hidden &amp;&amp; field.editorType !== 'MORE'" ng-class="{'can-fold':field.canFold, 'clear-both':newLine($index), 'full-width': field.fieldSize=='LARGE', 'half-width': field.fieldSize!='LARGE', 'rich-text-field-type': field.editorType==='RichEditor', 'user-options-section': field.editorType=='UserOptionsSection'}" pl-measure-watchers-distribution="form-field-ComboCasuistica_c" pl-form-field=""><div class="label-container" ng-hide="(field.editorType=='CheckBox' &amp;&amp; (!showCheckboxLabels &amp;&amp; field.inDslMode !== true)) || field.editorType=='MultiEntityPicker' || field.editorType=='UserOptionsSection'" style="width: 78.12px;">
<label for="withoutResolution_ComboCasuistica_c" id="withoutResolution_ComboCasuistica_c_label">
    <span class="label-text" ng-class="{'more-divider':field.editorType == 'MORE'}" pl-ellipsis-title="" ui-jq="tooltip" pl-ellipsis="" ui-options="{placement:'top', container:'body'}" data-original-title="" title="" style="overflow-wrap: break-word;">Causa del Problema </span>
    <span class="requiredAsterisk ng-hide" ng-show="field.required | bool ">*</span>
</label>
</div>
<div class="control-container" ng-switch="field.editorType" style="padding-right: 20px;">
<!-- ngSwitchWhen: MultiEntityPicker -->
<!-- ngSwitchWhen: UserOptionsSection -->
<!-- ngSwitchWhen: MORE -->
<!-- ngSwitchDefault:  --><div ng-switch-default="" ng-controller="formFieldCtrl" class="">
    <div item="formModel" initial-mode="edit" field-metadata="field" form-name="withoutResolution" pl-measure-watchers-distribution="pl-presenter-DropDownList" container-type="form" presentation-overrides="dslExpressionPresentationOverrides" on-apply-field-value="handleFieldValueChange(oldValue, newValue, fieldMetadata)" on-domain-decryption-required="handleDomainDecryptionRequired()" mt-remote-tenant="mtRemoteTenant"><!-- pl-presenter --><span class="control-template-placeholder editor-template-placeholder"><!-- ngInclude: 'js/modules/platform/ui/presentation-controls/dropdownlist/dropdownlist-editor-tmpl.html' --><div ng-include="'js/modules/platform/ui/presentation-controls/dropdownlist/dropdownlist-editor-tmpl.html'" class=""><div ng-controller="dropDownListEditorCtrl" data-aid="withoutResolution_ComboCasuistica_c" data-control-type="DropDownList" data-original-title="" ui-jq="tooltip" ui-options="{placement:'top'}">
<div class="select2-container ng-pristine ng-untouched ng-valid ng-valid-required" id="s2id_autogen25">
    <select
class="select2-choice select2-default" id="selectCausa"
tabindex="-1"
>
<option>NO APLICA CAUSA</option>
<option>ANULADO</option>
<option>APLICACIÓN NO GRABA DATO CORRECTO</option>
<option>CAMBIO IP EN SERVIDOR</option>
<option>CIERRE ABRUPTO ALICACION</option>
<option>CLAVE BLOQUEADA/OLVIDADA</option>
<option>CLAVE CADUCA</option>
<option>ERROR CONFIGURACION PC</option>
<option>ERROR DE CONFIGURACIÓN SERVIDOR</option>
<option>ERROR DIGITACION USUARIO</option>
<option>ERROR NO CONSIDERADO EN IMPLEMENTACION</option>
<option>FALLA CONEXIÓN DE RED</option>
<option>FALLA CONEXIÓN INTERNET</option>
<option>FALLA CONEXIÓN SAP</option>
<option>FALLA CREACION SOLPED U ORDEN</option>
<option>BD FALTA DE INDICES</option>
<option>BD SQL NO OPTIMIZADO</option>
<option>GUIAS NO LLEGAN A SAP</option>
<option>NO EXISTE REPORTE EN EL SISTEMA</option>
<option>NO SE PUDO DETERMINAR LA CAUSA</option>
<option>PROBLEMA COMUNICACIÓN ENTRE LEGADOS</option>
<option>PROBLEMA DE PERFIL USUARIO</option>
<option>PROBLEMA RETORNO IDOCS</option>
<option>SISTEMA MAL INSTALADO</option>
<option>SISTEMA O PLATAFORMA DESACTUALIZADA</option>
<option>SERVIDOR SIN ESPACIO EN DISCO</option>
<option>SERVIDOR SIN ESPACIO AREA LOG</option>
<option>SERVIDOR WEB ABAJO</option>
<option>SERVIDOR BD ABAJO</option>
<option>SERVIDOR SAP ABAJO</option>
<option>SERVIDOR DE ARCHIVOS ABAJO</option>
<option>SIN SERVICIO SHAREPOINT</option>
<option>SIN SERVICIO OFFICE 365</option>
<option>SIN SERVICIO DE CORREO</option>
></select>

</div>
</div></div></span><!-- end of pl-presenter --></div>
    <!-- ngRepeat: (validationKey, isInvalid) in form[field.name].$error -->
</div><!-- end ngSwitchWhen: -->
</div></div>`

var addComboCausa = () => {
    document.getElementById("withoutResolution_Notes_container").parentNode.insertBefore(htmlObject, document.getElementById("withoutResolution_Notes_container"))
    if(counter == 0) {
        document.getElementById('selectCausa').addEventListener('change', () => {
            var selected = document.getElementById("selectCausa").value;
            var element = document.getElementById('withoutResolution_Notes_container')
            var idTextArea = element.querySelector('div[class="cke_inner cke_reset"]').parentNode.previousSibling.getAttribute("id")
            var script = document.createElement('script');

            var regExGetAllCausas = /\*\*\[.*?\]\*\*/g;
            var regExGetAllEmptyTags = /<[^/>][^>]*><\/[^>]+>/g;

            script.textContent = `var text = CKEDITOR.instances.${idTextArea}.getData(); text = text.replace(${regExGetAllCausas}, ''); text = text.replace(${regExGetAllEmptyTags}, ''); CKEDITOR.instances.${idTextArea}.setData('**[${selected}]**' + text); CKEDITOR.instances.${idTextArea}.focus()`;
            
            document.body.appendChild(script);
            script.parentNode.removeChild(script);
            counter++;
        });
    }
}

var element = document.querySelector("a[data-aid='show-more']");
var mainView = document.getElementById('mainView');
var counter = 0;

var in_dom = false;

var mainObserver = new MutationObserver(function(mutations){  
    mutations.forEach(function(mutation){
        if(mutation.addedNodes.length)
        {
            Object.values(mutation.addedNodes).filter(item => {
                if(item.id === 'withoutResolution_Notes_container')
                {
                    console.log('withoutResolution_Notes_container added');
                    addComboCausa();
                }
            })
        }
        if(mutation.removedNodes.length)
        {
            Object.values(mutation.removedNodes).filter(item => {
                if(item.id === 'withoutResolution_Notes_container')
                {
                    console.log('withoutResolution_Notes_container removed');
                }
            })
        }
    })
})

var bodyObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function(mutation){
        if(mutation.addedNodes.length)
        {
            Object.values(mutation.addedNodes).filter(item => {
                if(item.id === 'mainView') {
                    console.log('added mainView container')
                    mainObserver.observe(document.getElementById('mainView'), { childList: true, subtree: true})
                }
                return item.id === 'mainView';
            }) 
        }
        if(mutation.removedNodes.length)
        {
            Object.values(mutation.addedNodes).filter(item => {
                if(item.id === 'mainView') {
                    console.log('removed mainView container')
                    mainObserver.disconnect()
                }
                return item.id === 'mainView';
            }) 
        }
    })
});
bodyObserver.observe(document.body, { childList: true });