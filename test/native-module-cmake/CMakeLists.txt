cmake_minimum_required(VERSION 3.4.3)

project(native)

include_directories(${CMAKE_JS_INC})

set(SOURCES
    src/native.cc
   )
include_directories(src)

add_library(${PROJECT_NAME} SHARED ${HEADERS} ${SOURCES})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
set_target_properties(${PROJECT_NAME} PROPERTIES CXX_STANDARD 14 CXX_STANDARD_REQUIRED ON)
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} ${EXTRA_LIBS} ${CPUID_LIB})

# for cmake-js 7.0.0
if(MSVC AND CMAKE_JS_NODELIB_DEF AND CMAKE_JS_NODELIB_TARGET)
  # Generate node.lib
  execute_process(COMMAND ${CMAKE_AR} /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
endif()
