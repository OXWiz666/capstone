 <!-- securityQuestion/Role -->
 <div x-data="{ open: false, selected: '' }" class="relative">
                        <label for="securityQuestion" class="block text-sm font-medium text-gray-700">securityQuestion/Role</label>
                        <div class="mt-1 relative">
                            <button type="button"
                                @click="open = !open"
                                class="relative w-full bg-gray-50 pl-10 pr-10 py-3 text-left cursor-pointer rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 ease-in-out hover:bg-gray-100"
                                :class="{'ring-2 ring-black': open}">
                                <span class="block truncate" x-text="selected || 'Select your securityQuestion'"></span>
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                                    </svg>
                                </span>
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg class="h-5 w-5 text-gray-400 transform transition-transform duration-200"
                                        :class="{'rotate-180': open}"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                    </svg>
                                </span>
                            </button>

                            <div x-show="open"
                                @click.away="open = false"
                                x-transition:enter="transition ease-out duration-200"
                                x-transition:enter-start="opacity-0 translate-y-1"
                                x-transition:enter-end="opacity-100 translate-y-0"
                                x-transition:leave="transition ease-in duration-150"
                                x-transition:leave-start="opacity-100 translate-y-0"
                                x-transition:leave-end="opacity-0 translate-y-1"
                                class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 border border-gray-200">
                                <select id="securityQuestion" name="securityQuestion" class="sr-only">
                                    <option value="">Select your securityQuestion</option>
                                    @foreach($roles as $role)
                                        <option value="{{ $role->id }}" {{ old('securityQuestion') == $role->id ? 'selected' : '' }}>
                                            {{ $role->roletype }}
                                        </option>
                                    @endforeach
                                </select>

                                @foreach($roles as $role)
                                    <button type="button"
                                        @click="selected = '{{ $role->roletype }}'; document.getElementById('securityQuestion').value = '{{ $role->id }}'; open = false"
                                        class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors cursor-pointer flex items-center space-x-2"
                                        :class="{'bg-gray-50': selected === '{{ $role->roletype }}'}">
                                        <span class="flex-1">{{ $role->roletype }}</span>
                                        <svg x-show="selected === '{{ $role->roletype }}'" class="h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                @endforeach

                            </div>
                        </div>
                    </div>  