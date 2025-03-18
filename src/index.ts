import './assets/css/index.less';
import { Options } from './types';
import { backendConfig, externalConfig, targetConfig } from './config';
import { Language, languages, translations } from './i18n';

let subUrl = '';
let currentLang: Language = 'en';

function copyText(copyStr: string) {
    navigator.clipboard.writeText(copyStr).then(() => {
        layui.layer.msg('复制成功 | Copy success~', { icon: 1 });
    }, () => {
        layui.layer.msg('复制失败 | Copy failed, please select copy manually', { icon: 2 });
    });
}

function generateSubUrl(data: Options) {
    const backend = data.backend;
    let originUrl = data.url;
    originUrl = encodeURIComponent(originUrl.replace(/(\n|\r|\n\r)/g, '|'));

    let newSubUrl = `${backend}&url=${originUrl}&target=${data.target}`;

    if (data.config) {
        newSubUrl += `&config=${encodeURIComponent(data.config)}`;
    }

    if (data.include) {
        newSubUrl += `&include=${encodeURIComponent(data.include)}`;
    }

    if (data.exclude) {
        newSubUrl += `&wxclude=${encodeURIComponent(data.exclude)}`;
    }

    if (data.name) {
        newSubUrl += `&filename=${encodeURIComponent(data.name)}`;
    }

    newSubUrl += `&emoji=${data.emoji || 'false'}&append_type=${data.append_type || 'false'}&append_info=${data.append_info || 'false'}&scv=${data.scv || 'false'}&udp=${data.udp || 'false'}&list=${data.list || 'false'}&sort=${data.sort || 'false'}&fdn=${data.fdn || 'false'}&insert=${data.insert || 'false'}`;
    subUrl = newSubUrl;
    $('#result').val(subUrl);
    copyText(subUrl);
}

function setLanguage(lang: Language) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n') as keyof typeof translations[Language];
        if(key && el instanceof HTMLElement) {
            el.textContent = translations[lang][key];
        }
    });
}

function initLanguageSelector() {
    const selector = document.createElement('select');
    selector.className = 'layui-select';
    
    Object.entries(languages).forEach(([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = name;
        selector.appendChild(option);
    });

    selector.value = currentLang;
    selector.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        setLanguage(target.value as Language);
    });

    const container = document.createElement('div');
    container.className = 'language-selector';
    container.appendChild(selector);
    
    document.querySelector('header')?.appendChild(container);
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    setLanguage(currentLang);

    const form = layui.form;

    let childrenHtml = '';
    targetConfig.forEach(option => {
        childrenHtml += `<option value="${option.value}">${option.label}</option>`;
    });
    $('#targetSelecter').append(childrenHtml);

    childrenHtml = '';
    externalConfig.forEach(group => {
        let html = '';
        group.options.forEach(option => {
            html += `<option value="${option.value}">${option.label}</option>`;
        });
        childrenHtml += `<optgroup label="${group.label}">${html}</optgroup>`;
    });
    $('#configSelecter').append(childrenHtml);

    childrenHtml = '';
    backendConfig.forEach(option => {
        childrenHtml += `<option value="${option.value}">${option.label}</option>`;
    });
    $('#backendSelecter').append(childrenHtml);
    form.render('select', 'optionsForm');

    form.on('submit(generate)', target => {
        const data = target.field as Options;
        generateSubUrl(data);
    });

    $('#importToClash').on('click', () => {
        if (!subUrl) { return layui.layer.msg('未生成新的订阅链接 | No new subscriptions Generated!', { icon: 2 }); }
        const url = `clash://install-config?url=${encodeURIComponent(subUrl)}`;
        window.open(url);
    });
});


