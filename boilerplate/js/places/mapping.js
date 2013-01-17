define([
    'places/ProfilePlace',
    'places/SettingsPlace',
    'places/SubSettingsPlace'
], function (ProfilePlace, SettingsPlace, SubSettingsPlace) {
    // This module just returns mapping of places to its string tokens
    return {
        '': ProfilePlace, // Default Place
        'profile': ProfilePlace,
        'settings': SettingsPlace,
        'sub-settings': SubSettingsPlace
    };
});