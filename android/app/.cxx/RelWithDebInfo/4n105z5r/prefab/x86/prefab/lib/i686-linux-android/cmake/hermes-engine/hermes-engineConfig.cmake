if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/kashif/.gradle/caches/transforms-3/7520d4b0a4e999977a8442778864768a/transformed/jetified-hermes-android-0.73.6-release/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/kashif/.gradle/caches/transforms-3/7520d4b0a4e999977a8442778864768a/transformed/jetified-hermes-android-0.73.6-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

