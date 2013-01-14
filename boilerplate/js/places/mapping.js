define([
    'places/ProfilePlace',
    'places/SettingsPlace'
], function (ProfilePlace, SettingsPlace) {
    // This module just returns mapping of places to its string tokens
    return {
        '': ProfilePlace, // Default Place
        'profile': ProfilePlace,
        'settings': SettingsPlace
    };
});