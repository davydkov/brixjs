define([
    'places/ProfilePlace',
    'places/SettingsPlace',
    'places/SubSettingsPlace',
    'places/ModalWindowPlace'
], function (ProfilePlace, SettingsPlace, SubSettingsPlace, ModalWindowPlace) {
    // This module just returns mapping of places to string tokens
    return {
        '': ProfilePlace, // Default Place
        'profile': ProfilePlace,
        'settings': SettingsPlace,
        'sub-settings': SubSettingsPlace,
        'modal-window': ModalWindowPlace
    };
});