cmake_minimum_required(VERSION 3.13)
cmake_policy(SET CMP0042 NEW)
set (CMAKE_CXX_STANDARD 14)
add_definitions(-DNAPI_VERSION=${napi_build_version})

project (prebuild-napi-test-cmake)
include_directories(${CMAKE_JS_INC})
add_library(${PROJECT_NAME} SHARED)
target_sources(${PROJECT_NAME} PRIVATE "src/native.cc" ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_JS_INC})
target_link_libraries(${PROJECT_NAME} PRIVATE ${CMAKE_JS_LIB})

# cmake-js 7.0.0
if(MSVC AND CMAKE_JS_NODELIB_DEF AND CMAKE_JS_NODELIB_TARGET)
  # Generate node.lib
  execute_process(COMMAND ${CMAKE_AR} /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
endif()
