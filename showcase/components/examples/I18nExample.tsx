import* as  React from "react";
import {Panel,I18N, I18NProvider,SelectInput} from "karcin-ui";

let langConfig = {
    tr: {
        name:"tr",
        message: {
            "panel": "Uluslararasılaştırma anlamınada gelir. Uluslararasılaştırma, kültür, bölge veya dilde farklılık gösteren hedef kitle için kolay lokalizasyonu sağlayan bir ürün, uygulama veya belge içeriği tasarlamak ve geliştirmektir. Bulunulan gölgeye göre dil değiştirme sistemidir.",
            "title": "i18 Nedir?"
            }
        },
    en: {
        name:"en",
        message: {
            "panel": "A product, application or document that provides easy localization for a target audience that differs in internationalization, culture, region or design and develop. It is a language changing system according to the shadow that is found.",
            "title": "What i18n?"
        }
    }
}

export default class I18nExample extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            language: "en"
        }
    }
    render() {
        let language = langConfig[this.state.language];
        return <div>
            <SelectInput
                name="language"
                label={"Dilinizi Seçiniz"}
                value="value"
                id="id"
                items={[
                    {id:1,value:"tr"},
                    {id:2,value:"en"}
                ]}
                onChange={this.selectOnChange.bind(this)}/>

            <I18NProvider language={language}>
                 <Panel title={<I18N id={"title"}/>}>
                    <I18N id={"panel"}/>
                </Panel>
            </I18NProvider>
        </div>
    }

    selectOnChange(e){
        let name = e.target.name;
        let state = [];
        state[e.target.name] = e.target.parsedValue.value;
        this.setState(state);
    }
}
